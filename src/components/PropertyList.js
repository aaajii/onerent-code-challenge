import React from "react";
import Property from "./Property";
import { useQuery, gql } from "@apollo/client";
import { PROPERTIES_PER_PAGE } from "../constants";
import { useHistory } from "react-router";

export const FEED_QUERY = gql`
    {
        feed {
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
                        firstName
                        lastName
                    }
                }
            }
        }
    }
`;

const NEW_PROPERTIES_SUBSCRIPTION = gql`
    subscription {
        newProperty {
            id
                street
                city
                state
                renters {
                    id
                    user {
                        id
                    }
                }
        }
    }
`;

const NEW_RENT_SUBSCRIPTION = gql`
    subscription {
        newRent {
            id
            property {
                id
                street
                city
                state
                renters {
                    id
                    user {
                        id
                    }
                }
            }
            user {
                id
            }
        }
    }
`;

const getQueryVariables = (isNewPage, page) => {
    const skip = isNewPage ? (page - 1) * PROPERTIES_PER_PAGE : 0;
    const take = isNewPage ? PROPERTIES_PER_PAGE : 100;
    const orderBy = { createdAt: "desc" };
    return { take, skip, orderBy };
};

const PropertyList = () => {
    const history = useHistory();
    const isNewPage = history.location.pathname.includes("new");
    const pageIndexParams = history.location.pathname.split("/");
    const page = parseInt(pageIndexParams[pageIndexParams.length - 1]);

    const { data, subscribeToMore } = useQuery(FEED_QUERY, {
        variables: getQueryVariables(isNewPage, page),
    });

    // Enables "real-time updates" on the list
    subscribeToMore({
        document: NEW_PROPERTIES_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const newProperty = subscriptionData.data.newProperty;
            const exists = prev.feed.properties.find(({ id }) => id === newProperty.id);
            if (exists) return prev;

            return Object.assign({}, prev, {
                feed: {
                    properties: [newProperty, ...prev.feed.properties],
                    count: prev.feed.properties.length + 1,
                    __typename: prev.feed.__typename,
                },
            });
        },
    });

    subscribeToMore({
        document: NEW_RENT_SUBSCRIPTION,
    });

    return (
        <div>
            {data && (
                <>
                    {data.feed.properties.map((property, index) => (
                        <Property key={property.id} property={property} index={index} />
                    ))}
                </>
            )}
        </div>
    );
};

export default PropertyList;
