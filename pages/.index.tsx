import Type { NextPage } from 'next'
import Head  from "@/app/head"
import { Text, Spacer } from "@nextui-org/react";
const Home: NextPage = () => {
    return (
        <>
        <Text h2>The future of article sharing</Text>
        <Text size="$lg">
       ShareArticles allows you to create and share articles.      
     </Text>

        </>
    )
}
export default Home;