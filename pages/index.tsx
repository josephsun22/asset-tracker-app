import { Card, Flex, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { NextPage } from "next";
import CardList from "./components/CardList"; // Corrected the path to CardList
import styles from "@/styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <CardList />
    </div>
  );
};

export default Home;
