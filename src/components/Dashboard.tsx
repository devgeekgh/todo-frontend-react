import { useContext, useEffect, useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

import { AuthContext } from '../contexts/auth'
import { getTodos } from '../services/api'
import { Todo } from '../types'

export const Dashboard = () => {
  const [todos, setTodos] = useState<Todo[] | undefined>(undefined)
  const authContext = useContext(AuthContext)

  useEffect(() => {
    authContext?.user &&
      getTodos()
        .then(({ data }) => {
          setTodos(data)
        })
        .catch((err) => {
          console.log(err)
        })
  }, [authContext?.user])
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            {todos ? (
              todos.map((todo) => {
                return (
                  <Tr key={todo.id}>
                    <Td>{todo.title}</Td>
                    <Td>{todo.description}</Td>
                  </Tr>
                )
              })
            ) : (
              <Tr>
                <Td colSpan={2}>No todos</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
