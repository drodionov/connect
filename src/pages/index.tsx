import Header from "@/components/Header";
import Form from "@/components/Form";
import PostFeed from "@/components/posts/PostFeed";

const Home = () => {
  return (
      <>
        <Header label="Home"/>
        <Form placeholder="What's happening?"/>
        <PostFeed/>
      </>
  )
}

export default Home;