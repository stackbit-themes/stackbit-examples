import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useNinetailed } from "@ninetailed/experience.js-next";
import { useProfile } from "@ninetailed/experience.js-next";
import { useState } from "react";

export default function ProfileControls({ allAudiences }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h2>Profile Controls 🔒</h2>
        <ControlsRow />
        <ProfileView allAudiences={allAudiences} />
      </div>
    </div>
  );
}

function ControlsRow() {
  const { identify } = useNinetailed();
  const router = useRouter();
  const [username, setUsername] = useState("");

  function setMembership(rank) {
    identify(username, { membership: rank });
    toast((t) => (
      <span>
        <b>{username}'s</b> membership set to: <b>{rank || "none"}</b>
      </span>
    ));
  }

  return (
    <div className="buttons">
      <input
        type="Username"
        placeholder="Logged-in username"
        onChange={(e) => { setUsername(e.target.value) }}
      />
      <button
        className="button"
        disabled={!username}
        onClick={() => {
          setMembership("bronze");
        }}
      >
        Bronze Membership
      </button>
      <button
        className="button"
        disabled={!username}
        onClick={() => {
          setMembership("gold");
        }}
      >
        Gold Membership
      </button>
      <button
        className="button"
        disabled={!username}
        onClick={() => {
          setMembership(null);
        }}
      >
        Reset Membership
      </button>
      <button
        className="button"
        onClick={() => {
          router.replace(router.asPath);
        }}
      >
        Refresh page
      </button>
    </div>
  );
}

function ProfileView({ allAudiences }) {
  const { loading, profile, error } = useProfile();

  if (error) {
    return <h3>Error loading profile</h3>;
  } else if (loading) {
    return <h3>Loading...</h3>;
  } else if (profile) {
    const audienceNames = profile.audiences.map((id) => allAudiences[id]);

    return (
      <div className={styles.profile}>
        <div>
          Audiences:{" "}
          {audienceNames.map((name) => (
            <span key={name} className={styles.tag}>
              {name}
            </span>
          ))}
        </div>
        <div>Traits: {JSON.stringify(profile.traits)}</div>
        <div>Country: {profile.location?.countryCode}</div>
        <div>Region: {profile.location?.region}</div>
        <div>City: {profile.location?.city}</div>
        <div>Sessions: {profile.session?.count}</div>
        <div>
          Returning user: {profile.session?.isReturningVisitor ? "True" : "False"}
        </div>
      </div>
    );
  }
}
