import { Box, Image, Text, Flex } from "@chakra-ui/react";

interface CardRowProps {
  rank: number;
  code: string;
  price: string;
  change: number;
  marketCap: string;
}

const CardRow: React.FC<CardRowProps> = ({ rank, code, price, change, marketCap }) => {
  const formattedChange = Math.abs(change).toFixed(2);
  return (
    <Flex
      background="gray.800"
      padding="4"
      borderRadius="md"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      marginBottom="4"
      flexDirection={{ base: "column", md: "row" }}
    >
      <Flex
        width={{ base: "100%", md: "20%" }}
        alignItems="center"
        justifyContent="center"
        mb={{ base: 2, md: 0 }}
      >
        <Text color="white" fontWeight="bold" textAlign="center">
          #{rank}
        </Text>
      </Flex>
      <Flex
        width={{ base: "100%", md: "30%" }}
        alignItems="center"
        justifyContent="center"
        mb={{ base: 2, md: 0 }}
      >
        {code && (
          <Image boxSize="45px" src={`icon/${code.toLowerCase()}.png`} alt={code} marginRight="2" />
        )}
        <Box>
          <Text color="white" fontWeight="bold" fontSize="lg">
            {code}
          </Text>
          <Text color="gray.400" fontSize="xs">
            {marketCap}
          </Text>
        </Box>
      </Flex>
      <Flex
        width={{ base: "100%", md: "25%" }}
        alignItems="center"
        justifyContent={{ base: "center", md: "flex-end" }}
        paddingRight={{ base: 0, md: 20 }}
        mb={{ base: 2, md: 0 }}
      >
        <Text color="white" fontWeight="bold" textAlign={{ base: "center", md: "right" }}>
          ${price}
        </Text>
      </Flex>
      <Flex width={{ base: "100%", md: "25%" }} alignItems="center" justifyContent="center">
        <Box
          display="inline-block"
          color={change >= 0 ? "#00FF00" : "#FF0000"}
          background={change >= 0 ? "rgba(0, 255, 0, 0.2)" : "rgba(255, 0, 0, 0.2)"}
          borderRadius="md"
          paddingX="2"
          paddingY="1"
        >
          <Text fontWeight="bold" width="100px" textAlign="center">
            {change >= 0 ? `▲ ${formattedChange}%` : `▼ ${formattedChange}%`}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default CardRow;
