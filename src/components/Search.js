import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";
import Property from "./Property";

const FEED_SEARCH_QUERY = gql`
    query FeedSearchQuery($filter: String!) {
        feed(filter: $filter) {
            id
            properties {
                id
                street
                city
                state
                zip
                createdAt
                renters {
                    id
                    user {
                        id
                    }
                }
            }
        }
    }
`;

const Search = () => {
    const [searchFilter, setSearchFilter] = useState("");
    const [executeSearch, { data }] = useLazyQuery(FEED_SEARCH_QUERY);
    return (
        <>
            <div>
                Search
                <input
                    type="text"
                    onChange={(e) => {
                        setSearchFilter(e.target.value);

                        // This is the closest I could get to an "autocomplete"
                        executeSearch({
                            variables: { filter: searchFilter },
                        });
                    }}
                />
                <button
                    onClick={() =>
                        executeSearch({
                            variables: { filter: searchFilter },
                        })
                    }
                >
                    OK
                </button>
            </div>
            {data &&
                data.feed.properties.map((property, index) => (
                    <Property
                        key={property.id}
                        property={property}
                        index={index}
                    />
                ))}
        </>
    );
};

export default Search;
