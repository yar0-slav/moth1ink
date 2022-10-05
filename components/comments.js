import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Textarea
} from '@chakra-ui/react'
import React, { useState } from 'react'

import { firestore, serverTimestamp } from '../lib/firebase'

import 'react-medium-image-zoom/dist/styles.css'

import toast from 'react-hot-toast'

import StarsRating from 'react-star-rate'

import { Icon } from '@chakra-ui/react'
import { IoAddCircleSharp, IoRemoveCircleSharp, IoStar } from 'react-icons/io5'

export default function AddNewComment() {
  const [username, setUsername] = useState('')
  const [content, setContent] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [starRating, setStartRating] = useState('')

  const [values, setValues] = useState([
    {
      column: 'pros',
      inputValues: [
        {
          value: '',
          executed: false
        }
      ]
    },
    {
      column: 'cons',
      inputValues: [
        {
          value: '',
          executed: false
        }
      ]
    }
  ])

  // Validation
  const isValid =
    username.length >= 3 &&
    username.length < 100 &&
    starRating > 0 &&
    content.length >= 4

  const addComment = async e => {
    e.preventDefault()

    const ref = firestore.collection('comments')

    let filteredValues = values.map(x => {
      let filtered = x.inputValues.filter(y => y.value)
      return { ...x, inputValues: filtered }
    })

    const data = {
      username,
      content,
      starRating,
      filteredValues,
      time: serverTimestamp()
    }

    await ref.add(data)

    setSubmitted(true)
    toast.success('Post created!')
  }
  
  const handleChange = (e, columnIndex, innerObjectIndex) => {
    const { name, value } = e.target

    let data = [...values]
    data[columnIndex]['inputValues'][innerObjectIndex][name] = value
    setValues(data)

    if (!values[columnIndex]['inputValues'][innerObjectIndex]['executed']) {
      // add a new input field

      setValues(
        values.map((elem, arrayIndex) => {
          let newfield = { value: '', executed: false }
          return arrayIndex === columnIndex
            ? { ...elem, inputValues: [...elem.inputValues, newfield] }
            : elem
        })
      )

      data[columnIndex]['inputValues'][innerObjectIndex]['executed'] = true
    }

    // remove next input field if the current is empty
    /*

        if (values[columnIndex]['inputValues'][innerObjectIndex][name].length === 0 && innerObjectIndex >= 0) { 

            // set the current object to false 
            data[columnIndex]['inputValues'][innerObjectIndex]['executed'] = false;

            // get the index of all the executed false objects
            let emptyIndex = [];
            values[columnIndex]['inputValues'].forEach((x, index) => {
                if (!x.executed) {
                    emptyIndex.push(index + 1)
                }
            });
            
            // get the lowest number
            const removeInputs = data[columnIndex]['inputValues'].length - Math.max(...emptyIndex);
            
            // removing the element using splice
            data[columnIndex]['inputValues'].splice(innerObjectIndex, removeInputs);

            // updating the list
            setValues(data);

        }
*/
  }

  return (
    <form onSubmit={addComment}>
      <Box display={submitted ? 'none' : 'block'}>
        <StarsRating
          allowHalf={false}
          symbol={<Icon as={IoStar} fontSize={{ base: '50px', md: '85px' }} />}
          onChange={val => setStartRating(val)}
        />

        <Flex mt="1rem" mb="2rem">
          {values.map((outerArray, columnIndex) => {
            return (
              <Box flexBasis={'49%'} key={columnIndex}>
                <FormLabel> {columnIndex === 0 ? 'Pros' : 'Cons'} </FormLabel>
                {outerArray.inputValues.map((innerArray, innerObjectIndex) => {
                  return (
                    <InputGroup
                      display={'flex'}
                      flexDirection="column"
                      key={innerObjectIndex}
                    >
                      <InputLeftElement pointerEvents="none">
                        {columnIndex === 0 ? (
                          <Icon
                            as={IoAddCircleSharp}
                            color={'green'}
                            fontSize={'28px'}
                          />
                        ) : (
                          <Icon
                            as={IoRemoveCircleSharp}
                            color={'red'}
                            fontSize={'28px'}
                          />
                        )}
                      </InputLeftElement>
                      <Input
                        value={values[columnIndex].inputValues.value}
                        variant="unstyled"
                        name="value"
                        lineHeight={'36px'}
                        columnIndex={columnIndex}
                        onChange={event => {
                          handleChange(event, columnIndex, innerObjectIndex)
                        }}
                        placeholder={
                          'Write ' +
                          outerArray.column.slice(0, -1) +
                          ' n. ' +
                          (innerObjectIndex + 1) +
                          ' here.'
                        }
                      />
                    </InputGroup>
                  )
                })}
              </Box>
            )
          })}
        </Flex>

        <Box>
          <FormLabel>Name *</FormLabel>
          <Input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Type your name here"
            mb="15px"
          />

          <FormLabel>Comment *</FormLabel>
          <Textarea
            value={content}
            overflow="hidden"
            resize="vertical"
            placeholder="Type your comment here if you want to elaborate more, this is optional."
            onChange={e => setContent(e.target.value)}
          />
        </Box>

        <Flex justifyContent={'center'}></Flex>

        <Button type="submit" disabled={!isValid} color="black" mt="20px">
          Submit
        </Button>
      </Box>
      {submitted ? (
        <Text>Your comment was submited, thanks for taking the time!</Text>
      ) : (
        ''
      )}
    </form>
  )
}
