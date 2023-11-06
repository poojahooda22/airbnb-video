import ClientOnly from "./componentts/ClientOnly";
import Container from "./componentts/Container";

export default function Home() {
  return (
    <ClientOnly>
      <Container>
        <div className="">
          <div>
            My future Listings
          </div>
        </div>
      </Container>
    </ClientOnly>
  )
}
