import { gql, useQuery } from "@apollo/client";
import { format } from "date-fns";
import { NewArticleForm } from "./components/NewArticleForm";

export type Article = {
  id: string;
  title: string;
  image: string;
  description: string;
  created_at: string;
};

const GET_ARTICLES = gql`
  query($orderBy: String!) {
    articles(orderBy: $orderBy) {
      id
      image
      title
      description
      created_at
    }
  }
`;

function App() {
  const { data, loading } = useQuery<{ articles: Article[] }>(GET_ARTICLES, {
    variables: {
      orderBy: "DESC",
    },
  });

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <NewArticleForm />

      {data?.articles.map((article) => (
        <div key={article.id} style={{ marginBottom: 64 }}>
          <img src={article.image} alt="image" />
          <p>
            <strong>{article.title}</strong>
          </p>
          <p>{article.description}</p>
          <time>
            {format(new Date(article.created_at), "dd/mm/yyyy 'às' HH:mm")}
          </time>
        </div>
      ))}
    </div>
  );
}

export default App;
