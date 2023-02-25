import type { NextPage } from "next";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Grid, Textarea, Text, Button } from "@nextui-org/react";
import { createServerSupabaseClient, User } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';
import { useState, useEffect } from "react";

// localhost:3000/editArticle?id=1 => THis is an example

const EditArticle: NextPage<{ user: User }, {}> = ({ user }) => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { id } = router.query;

  const initialState = {
    title: "",
    content: ""
  }
  const [articleData, setArticleData] = useState(initialState);
  const handleChange = (e: any) => {
    setArticleData({...articleData, [e.target.name] : e.target.value })
  }

  useEffect( () => {
    async function getArticle() {
        const {data, error } = await supabaseClient
            .from("articles")
            .select("*")
            .filter("id", "eq", id )
            .single();
        if (error) {
            console.log(error);
        } else {
            setArticleData(data); // This still have the Title and the cantent
        }                 
    }
    if (typeof id !== "undefined") {
        getArticle();
    }
}, [id] )

  const editArticle = async () => {
    try {
      const { data, error } = await supabaseClient
      .from("articles")
      .update([
        {
          title: articleData.title,
          content: articleData.content,

        }
      ])
      .eq("id", id);
      if (error) throw error;
      router.push("/article?id=" + id);
    } catch (error: any) {
      alert(error.message);
    }
  }

  return(
    <Grid.Container gap={1}>
        <Text h3>Title</Text>
        <Grid xs={12}>
            <Textarea
                name="title"
                aria-label="title"
                placeholder="Article Title"
                fullWidth={true}
                rows={1}
                size="xl"
                onChange={handleChange}
                initialValue={articleData.title}
            />
        </Grid>
        <Text h3>Article Text</Text>
        <Grid xs={12}>
            <Textarea
                name="content"
                aria-label="content"
                placeholder="Article Content"
                fullWidth={true}
                rows={6}
                size="xl"
                onChange={handleChange}
                initialValue={articleData.content}
            />
        </Grid>
        <Grid xs={12}>
            <Text>Editing as {user?.email}</Text>
        </Grid>
        <Button onPress={editArticle}>Update Article</Button>
    </Grid.Container>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };

  return {
    props: {
      user: session.user
    }
  };
};

export default EditArticle;
