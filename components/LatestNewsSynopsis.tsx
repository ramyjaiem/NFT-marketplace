import Link from 'next/link';
import styled from 'styled-components';

const SynopsisCard = styled.div`
  max-width: 314px;
  margin-bottom: 20px;
  img {
    border-radius: 10px;
  }

  .synopsis-text {
    margin-top: 10px;
    color: ${(props) => props.theme.colors.white};
    font-size: ${(props) => props.theme.fontSizes[2]};
    font-weight: 500;
    text-transform: capitalize;
  }
`;

export default function LatestNewsSynopsis({ newsItem }: any) {
  const { slug, title } = newsItem.fields;
  return (
    <SynopsisCard>
      <img src="/news_img1.png" alt="news-image" />
      <div className="synopsis-text">
        <Link href={`/news/${slug}`}>{title}</Link>
      </div>
    </SynopsisCard>
  );
}
