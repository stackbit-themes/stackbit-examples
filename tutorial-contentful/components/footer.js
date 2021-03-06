import Container from './container'
import { DOCS_URL, EXAMPLE_URL } from '../lib/constants'

export default function Footer() {
  return (
    <footer className="border-t bg-accent-1 border-accent-2">
      <Container>
        <div className="flex flex-col items-center py-28 lg:flex-row">
          <h3 className="mb-10 text-4xl font-bold leading-tight tracking-tighter text-center lg:text-5xl lg:text-left lg:mb-0 lg:pr-4 lg:w-1/2">
            Next.js + Contentful + Stackbit
          </h3>
          <div className="flex flex-col items-center justify-center lg:flex-row lg:pl-4 lg:w-1/2">
            <a
              href={DOCS_URL}
              className="px-12 py-3 mx-3 mb-6 font-bold text-white transition-colors duration-200 bg-black border border-black hover:bg-white hover:text-black lg:px-8 lg:mb-0"
            >
              Read Documentation
            </a>
            <a href={EXAMPLE_URL} className="mx-3 font-bold hover:underline">
              View on GitHub
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
