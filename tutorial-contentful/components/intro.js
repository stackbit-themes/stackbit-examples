import { CMS_NAME, CMS_URL } from '../lib/constants'

export default function Intro() {
  return (
    <section className="flex flex-col items-center mt-16 mb-16 md:flex-row md:justify-between md:mb-12">
      <h1 className="text-6xl font-bold leading-tight tracking-tighter md:text-8xl md:pr-8">
        Blog.
      </h1>
      <h4 className="mt-5 text-lg md:pl-8">
        <span className="block mb-2 text-center lg:mb-0 md:text-right">
          A statically generated blog example using{' '}
          <a
            href="https://nextjs.org/"
            className="underline transition-colors duration-200 hover:text-success"
          >
            Next.js
          </a>{' '}
          and{' '}
          <a
            href={CMS_URL}
            className="underline transition-colors duration-200 hover:text-success"
          >
            {CMS_NAME}
          </a>
          .
        </span>
        <span className="block text-center md:text-right">
          Made visually-editable by adding{' '}
          <a
            href="https://stackbit.com/"
            className="underline transition-colors duration-200 hover:text-success"
          >
            Stackbit
          </a>
          .
        </span>
      </h4>
    </section>
  )
}
