import { Row, Col } from 'react-bootstrap';
import PageLayout from 'components/PageLayout';
import AuthorIntro from 'components/AuthorIntro';
import CardItem from 'components/CardItem';
import CardListItem from 'components/CardListItem';

function Home(props) {
  return (
    <PageLayout>
      <AuthorIntro />
      <hr/>
      {props.message}
      <Row className="mb-5">
        <Col md="10">
          <CardListItem />
        </Col>
        <Col md="4">
          <CardItem />
        </Col>
      </Row>
    </PageLayout>
  )
}

export default Home

// This function is called during the build (build time)
// Provides props to your page
// It will create static page  
export async function getStaticProps() {
  return {
    props: {
      message: "Hello World"
    }
  }
}
