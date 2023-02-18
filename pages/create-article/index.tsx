import type { NextPage } from "next";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Grid, Textarea, Text, Button } from "@nextui-org/react";
import { createServerSupabaseClient, User } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';
import { useState } from "react";


const CreateArticle: NextPage<{ user: User }, {}> = ({ user }) => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const initialState = {
    title: "",
    content: ""
  }
  const [articleData, setArticleData] = useState(initialState);
  const handleChange = (e: any) => {
    setArticleData({...articleData, [e.target.name] : e.target.value })
  }
  const createArticle = async () => {
    try {
      const { data, error } = await supabaseClient
      .from("articles")
      .insert([
        {
          title: articleData.title,
          content: articleData.content,
          user_id: user?.id
        }
      ])
      .single();
      if (error) throw error;
      setArticleData(initialState);
      router.push("/mainFeed");
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
            />
        </Grid>
        <Grid xs={12}>
            <Text>Posting as {user?.email}</Text>
        </Grid>
        <Button onPress={createArticle}>Create Article</Button>
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

export default CreateArticle;
