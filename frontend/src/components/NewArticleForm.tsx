import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { Article } from "../App";

const CREATE_ARTICLE = gql`
  mutation($title: String!, $description: String!, $image: String!) {
    createArticle(title: $title, description: $description, image: $image) {
      id
      title
      image
      description
      created_at
    }
  }
`;

export function NewArticleForm() {
  const [form, setForm] = useState({} as Article);
  const [createArticle, { data, loading, error }] = useMutation(CREATE_ARTICLE);

  async function handleCreateArticle(event: FormEvent) {
    event.preventDefault();

    if (!form.title) return;

    const { title, description, image } = form;

    await createArticle({
      variables: {
        title,
        description,
        image,
      },
    });
  }

  return (
    <form onSubmit={handleCreateArticle} style={{ marginBottom: 64 }}>
      <input
        type="text"
        placeholder="Título"
        value={form.title}
        onChange={(event) =>
          setForm((old) => ({
            ...old,
            title: event.target.value,
          }))
        }
      />
      <input
        type="text"
        placeholder="Imagem"
        value={form.image}
        onChange={(event) =>
          setForm((old) => ({
            ...old,
            image: event.target.value,
          }))
        }
      />
      <input
        type="text"
        placeholder="Descrição"
        value={form.description}
        onChange={(event) =>
          setForm((old) => ({
            ...old,
            description: event.target.value,
          }))
        }
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
