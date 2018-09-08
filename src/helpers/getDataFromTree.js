import reactTreeWalker from 'react-tree-walker'

const fetchDataFromTree = (tree) => {
    const visitor = (element, instance) => {
        if (instance && typeof instance.fetchData === 'function') {
            return instance.fetchData().then(() => true);
        }
    };

    return reactTreeWalker(tree, visitor);
};

export default fetchDataFromTree;
