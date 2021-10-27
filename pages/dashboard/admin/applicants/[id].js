import React from 'react';
import {Flex,Table,
    TableCaption,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react'

export default function applicants() {
    return (
        <Flex 
        flexDir="column"
        w='100vw'
        overflow="hidden"
        >
            {/**Column 1 */}
            <Flex
            flexDir=""
            w='70%'
            
            >
                <Table variant="striped" colorScheme="teal">
  <TableCaption>List of Applicants</TableCaption>
  <Thead>
    <Tr>
      <Th>Name</Th>
      <Th>Date of Registration</Th>
      <Th isNumeric>Phone Number</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>Dubaka Hajari</Td>
      <Td>12/12/2021</Td>
      <Td isNumeric>0751010101</Td>
    </Tr>
  </Tbody>
  <Tfoot>
  </Tfoot>
</Table>
                
            </Flex>
        </Flex>
    )
}
