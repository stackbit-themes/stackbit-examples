import Container from './container'
import { DOCS_URL } from '../lib/constants.js'

export default function Alert() {
  return (
    <div className="border-b bg-accent-1 border-accent-2">
      <Container>
        <div className="py-2 text-sm text-center">
          This was forked from{' '}
          <a
            href="https://github.com/vercel/next.js/tree/canary/examples/cms-contentful"
            className="underline transition-colors duration-200 hover:text-success"
          >
            this Next.js example
          </a>{' '}
          to serve{' '}
          <a
            href={DOCS_URL}
            className="underline transition-colors duration-200 hover:text-success"
          >
            the Stackbit integration guide
          </a>
          .
        </div>
      </Container>
    </div>
  )
}
