import React, {useState} from 'react';
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router";
import { PROPERTIES_PER_PAGE } from '../constants';
import { FEED_QUERY } from './PropertyList';

const CREATE_PROPERTY_MUTATION = gql`
    mutation PostMutation(
        $street: String!
        $city: String!
        $state: String!
        $zip: Int!
    ){
        post(street: $street, city: $city, state: $state, zip: $zip){
            id
            createdAt
            street
            city
            state
            zip
        }
    }
`;

const CreateProperty = () =>{
    const [formState, setFormState] = useState({
        street: '',
        city: '',
        state: '',
        zip: ''
    });

    const history = useHistory();
    
    const [createProperty] = useMutation(CREATE_PROPERTY_MUTATION, {
        variables: {
            street: formState.street,
            city: formState.city,
            state: formState.state,
            zip: Number(formState.zip),
        },
        update: (cache, { data: { post } }) => {
            const take = PROPERTIES_PER_PAGE;
            const skip = 0;
            const orderBy = { createdAt: 'desc' };
      
            const data = cache.readQuery({
              query: FEED_QUERY,
              variables: {
                take,
                skip,
                orderBy
              }
            });
      
            cache.writeQuery({
              query: FEED_QUERY,
              data: {
                feed: {
                  properties: [post, ...data.feed.properties]
                }
              },
              variables: {
                take,
                skip,
                orderBy
              }
            });
        },
        onCompleted: () => history.push('/')
    });

    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    createProperty();
                }
                }>
                    <div className="flex flex-column mt3">
                    <label> Street </label>
                    <input
                        className="mb2"
                        value={formState.street}
                        onChange={(e) =>
                        setFormState({
                            ...formState,
                            street: e.target.value
                        })
                        }
                        type="text"
                        placeholder="Enter the street name..."
                    />
                    <label> City </label>
                    <input
                        className="mb2"
                        value={formState.city}
                        onChange={(e) =>
                        setFormState({
                            ...formState,
                            city: e.target.value
                        })
                        }
                        type="text"
                        placeholder="Enter the city name..."
                    />
                    <label> State </label>
                    <input
                        className="mb2"
                        value={formState.state}
                        onChange={(e) =>
                        setFormState({
                            ...formState,
                            state: e.target.value
                        })
                        }
                        type="text"
                        placeholder="Enter the state name..."
                    />
                    <label> ZIP Code </label>
                    <input
                        className="mb2"
                        value={formState.zip}
                        onChange={(e) =>
                        setFormState({
                            ...formState,
                            zip: e.target.value
                        })
                        }
                        type="text"
                        placeholder="Enter the ZIP code..."
                    />
                    </div>
                    <button type="submit">Submit</button>
            </form>
        </div>
    )
};

export default CreateProperty;