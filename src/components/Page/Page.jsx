import React from 'react';
import { observer } from 'mobx-react';
import Apartments from '../Apartments/Apartments';

const Page = observer(({ store }) => (
    <div>
        <Apartments apartments={store.apartments} />
    </div>
));

export default Page;
