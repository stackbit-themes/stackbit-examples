import Head from "next/head";
import { getComponent } from "../components";
import { getPage, getAllPageSlugs } from "../utils/contentful";
import ProfileControls from "../components/ProfileControls";
import { getAudiencesMap } from "../utils/ninetailed";
import { isDev } from "../utils";

export default function Page(props) {
  const {
    page: { _id, fields },
    allAudiences
  } = props;
  return (
    <>
      <Head>
        <title>{fields.title}</title>
      </Head>
      <div className="container" data-sb-object-id={_id}>
        {fields.sections &&
          fields.sections.map((section, index) => {
            const Component = getComponent(section._type);
            return <Component path={`sections.${index}`} key={index} {...section} />;
          })}

        {isDev && <ProfileControls allAudiences={allAudiences} />}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = await getAllPageSlugs();
  return {
    paths: slugs,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const allAudiences = isDev ? await getAudiencesMap() : null;
  const page = await getPage(params.slug);
  return {
    props: {
      page,
      allAudiences
    }
  };
}
