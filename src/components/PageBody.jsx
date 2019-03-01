import React, { Fragment } from "react";
import UsersList from "../containers/UsersList.jsx";
import Details from "../containers/UserDetails.jsx";

const PageBody = () => (
   <Fragment>
      <section className='flex_row'>
         <UsersList />
         <Details />
      </section>
   </Fragment>
);

export default PageBody;
