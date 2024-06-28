import { useEffect, useState, useRef, useCallback } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import CardRow from "./CardRow";

const CryptoList: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [sortField, setSortField] = useState("market_cap");
  const [sortDirection, setSortDirection] = useState("desc");
  const [cryptos, setCryptos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Page state for pagination
  const observerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const clearInput = () => {
    setInputValue("");
    setFilteredData(cryptos);
    setPage(1);
  };

  const fetchCryptos = useCallback(
    async (page: number) => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/crypto?start=${
            1 + 25 * (page - 1)
          }&limit=25&sort=${sortField}&sort_dir=${sortDirection}`
        );
        const data = await response.json();
        if (page === 1) {
          setCryptos(data.data); // Initial load
        } else {
          setCryptos((prev) => [...prev, ...data.data]); // Append new data
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    },
    [sortField, sortDirection]
  );

  useEffect(() => {
    fetchCryptos(1); // Initial fetch
  }, [fetchCryptos]);

  useEffect(() => {
    if (page > 1) {
      fetchCryptos(page); // Fetch more data when page changes
    }
  }, [page, fetchCryptos]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue) {
        const filtered = cryptos.filter(
          (item) =>
            item.symbol.toLowerCase().includes(inputValue.toLowerCase()) ||
            item.name.toLowerCase().includes(inputValue.toLowerCase())
        );

        setFilteredData(filtered);
      } else {
        setFilteredData(cryptos);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [inputValue, cryptos]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setPage(1); // Reset page to 1 when sorting
  };

  const getTriangle = (field: string) => {
    if (sortField !== field) {
      return <Text color="gray.500">▼</Text>;
    }
    return sortDirection === "asc" ? (
      <Text color="purple.500">▲</Text>
    ) : (
      <Text color="purple.500">▼</Text>
    );
  };

  const formattedNumber = (x: number): string => {
    if (x < 1000000) {
      return x.toFixed(2).toString();
    } else if (x < 1000000000) {
      return (x / 1000000).toFixed(2) + " Mn";
    } else if (x < 1000000000000) {
      return (x / 1000000000).toFixed(2) + " Bn";
    } else {
      return (x / 1000000000000).toFixed(2) + " Tn";
    }
  };

  const handleObserver = useCallback(
    (entries: any[]) => {
      const target = entries[0];
      if (target.isIntersecting && !loading) {
        setPage((prev) => prev + 1);
      }
    },
    [loading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [handleObserver]);

  return (

        <Flex
          background="gray.900"
          padding="0"
          borderRadius="md"
          alignItems="center"
          justifyContent="space-between"
          height="60px"
          width="100%"
        >
          <Flex width="20%" alignItems="center" justifyContent="center">
            <Text color="white" fontWeight="bold" textAlign="center">
              #
            </Text>
            <Button
              aria-label="Sort by rank"
              onClick={() => handleSort("market_cap")}
              variant="unstyled"
              size="sm"
              marginLeft="2"
            >
              {getTriangle("market_cap")}
            </Button>
          </Flex>
          <Flex width="30%" alignItems="center" justifyContent="center">
            <Text color="white" fontWeight="bold" fontSize="lg">
              Name
            </Text>
            <Button
              aria-label="Sort by name"
              onClick={() => handleSort("name")}
              variant="unstyled"
              size="sm"
              marginLeft="2"
            >
              {getTriangle("name")}
            </Button>
          </Flex>
          <Flex width="25%" alignItems="center" justifyContent="center" paddingRight="10">
            <Text color="white" fontWeight="bold" textAlign="center">
              Price
            </Text>
            <Button
              aria-label="Sort by price"
              onClick={() => handleSort("price")}
              variant="unstyled"
              size="sm"
              marginLeft="2"
            >
              {getTriangle("price")}
            </Button>
          </Flex>
          <Flex width="25%" alignItems="center" justifyContent="center">
            <Text color="white" fontWeight="bold" textAlign="center">
              24h %
            </Text>
            <Button
              aria-label="Sort by 24h %"
              onClick={() => handleSort("percent_change_24h")}
              variant="unstyled"
              size="sm"
              marginLeft="2"
            >
              {getTriangle("percent_change_24h")}
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <Box width="90%" display="flex" flexDirection="column" gap="1" marginTop="170px">
        {(inputValue ? filteredData.slice(0, 25) : cryptos).map((crypto, index) => (
          <CardRow
            key={crypto.id || index}
            rank={crypto.cmc_rank}
            code={crypto.symbol}
            price={formattedNumber(crypto.quote.USD.price)}
            change={crypto.quote.USD.volume_change_24h}
            marketCap={formattedNumber(crypto.quote.USD.market_cap)}
          />
        ))}
        <div ref={observerRef} />
      </Box>
      {loading && <Text color="white">Loading more...</Text>}
    </Flex>
  );
};

export default CryptoList;
