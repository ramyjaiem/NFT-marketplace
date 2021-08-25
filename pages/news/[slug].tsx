import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styled from 'styled-components';

const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const response = await contentfulClient.getEntries({
    content_type: 'news',
  });

  const paths = response.items.map((item: any) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const { items } = await contentfulClient.getEntries({
    content_type: 'news',
    'fields.slug': params.slug,
  });

  return {
    props: { news: items[0] },
  };
};

const Container = styled.div`
  min-height: 100vh;
  color: ${(props) => props.theme.colors.white};
`;

const ContentWrapper = styled.div`
  margin: 45px 5%;
  h2 {
    color: ${(props) => props.theme.colors.white};
  }
`;

export default function NewsDetails({ news }: any) {
  const { title, newsContent } = news.fields;
  return (
    <Container>
      <ContentWrapper>
        <h2>{title}</h2>
        <div>{documentToReactComponents(newsContent)}</div>
      </ContentWrapper>
    </Container>
  );
}
