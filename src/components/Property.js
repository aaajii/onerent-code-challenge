import { AUTH_TOKEN, PROPERTIES_PER_PAGE } from "../constants";
import { timeDifferenceForDate } from "../utils";
import React from "react";
import { gql, useMutation } from "@apollo/client";
import { FEED_QUERY } from "./PropertyList";

const RENT_MUTATION = gql`
    mutation VoteMutation($propertyId: ID!) {
        rent(propertyId: $propertyId) {
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

const Property = (props) => {
    const { property } = props;
    const authToken = localStorage.getItem(AUTH_TOKEN);
    const take = PROPERTIES_PER_PAGE;
    const skip = 0;
    const orderBy = { createdAt: "desc" };

    const [rent] = useMutation(RENT_MUTATION, {
    variables: {
      propertyId: property.id
    },
    update(cache, { data: { rent } }) {
      const { feed } = cache.readQuery({
        query: FEED_QUERY,
        variables: {
            take,
            skip,
            orderBy
          }
      });

      const updatedProperties = feed.properties.map((feedProperty) => {
        if (feedProperty.id === property.id) {
          return {
            ...feedProperty,
            renters: [...feedProperty.renters, rent]
          };
        }
        return feedProperty;
      });

      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            properties: updatedProperties
          }
        }
      });
    }
  });

    return (
        <div className="flex mt2 items-start">
            <div className="flex items-center">
                <span className="gray">{props.index + 1}.</span>
                {authToken && (
                    <div
                        className="ml1 gray f11"
                        style={{ cursor: "pointer" }}
                        onClick={rent}
                    >
                        Rent
                    </div>
                )}
            </div>
            <div className="ml1">
                <div>
                    {property.street} ({property.city}), {property.state} {property.zip}
                </div>
                {authToken && (
                    <div className="f6 lh-copy gray">
                        {property.renters.length} renters |
                        posted {timeDifferenceForDate(property.createdAt)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Property;
