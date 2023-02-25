import type { NextPage } from 'next';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useEffect, useState } from 'react';
import { Text, Spacer, User, Button } from '@nextui-org/react';
import { NextRouter } from 'next/router';

const Article: NextPage = () => {
    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const router = useRouter() as NextRouter;
    const [ article, setArticle ] = useState<any>({});

    const { id } = router.query;

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
                setArticle(data);
            }                 
        }
        if (typeof id !== "undefined") {
            getArticle();
        }
    }, [id] )

    const deleteArticle = async () => {
        try {
            const { data, error } = await supabaseClient
                .from("articles")
                .delete()
                .eq("id", id)
                if (error) throw error;
                router.push("/main-feed");
        } catch (error: any) {
            alert(error.message);
        }
    }

    return (
        <>
            <Text h2>{article.title}</Text>
            <Spacer y={.5} />
            <User
            name={article.user_email?.toLowerCase()}
            size="md" />
            <Spacer y={1} />
            <Text size="$lg" >
                {article.content}
          </Text>
                    { user && article.user_id === user.id ?
            <> 
                <Spacer y={.5} />
                <Button size="sm" onPress={() => router.push("/editArticle?id=" + id)}>Edit{/* This should be take us to edid page */}</Button>                 
                <Spacer y={.5} />
                <Button size="sm" color="error" onPress={ () => deleteArticle() }>Delete</Button>
            </>
            : null }
        </>
    )
}
export default Article;