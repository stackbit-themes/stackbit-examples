import Container from './container'
import { EXAMPLE_URL } from '../lib/constants'

export default function Alert() {
  return (
    <div className="border-b bg-accent-1 border-accent-2">
      <Container>
        <div className="py-2 text-sm text-center">
          The source code for this blog is{' '}
          <a
            href={EXAMPLE_URL}
            className="underline transition-colors duration-200 hover:text-success"
          >
            available on GitHub
          </a>
          .
        </div>
      </Container>
    </div>
  )
}
