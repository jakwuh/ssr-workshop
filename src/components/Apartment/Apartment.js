import React from 'react';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import * as styles from './Apartment.less';
import getFlatType from './helpers/getFlatType';
import getLastUpdated from './helpers/getLastUpdated';

const getContent = (item) =>
    <>
        <p>Цена: ${parseInt(item.price.converted.usd.amount)} / мес.</p>
        <p>{item.contact.owner ? 'Собственник' : 'Агентство'}</p>
        <p>Тип: {getFlatType(item)}</p>
        <p>Обновлено: {getLastUpdated(item)}</p>
        <p>Адрес: {item.location.address}</p>
    </>;

class Apartment extends React.Component {
    state = {
        seen: IS_SERVER ? false : Boolean(localStorage.getItem(this.props.item.id)),
    };

    toggleItem = e => {
        e.preventDefault();

        this.setState(prevState => ({
            seen: !prevState.seen,
        }));
    };

    componentDidMount() {
        this.interval = setInterval(() => this.forceUpdate(), 30000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidUpdate() {
        const { item: { id } } = this.props;
        localStorage.setItem(id, this.state.seen ? '1' : '');
    }

    render() {
        const { item } = this.props;
        const style = this.state.seen ? {} : { background: '#FFF8DC' };
        const title = this.state.seen ? 'Вернуть' : 'Просмотрено';

        return (
            <a target="_blank" rel="noopener" href={this.props.item.url} className={styles.card}>
                <Card
                    style={style}
                    hoverable
                    cover={<img className={styles.img} src={item.photo} alt={item.location.address}/>}
                    bordered={false}
                    actions={[
                        <Button onClick={this.toggleItem} type="primary">{title}</Button>
                    ]}
                >
                    {getContent(item)}
                </Card>
            </a>
        );
    }

}

export default Apartment;
