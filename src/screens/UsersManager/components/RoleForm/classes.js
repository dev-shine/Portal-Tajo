import { StyleSheet } from 'aphrodite/no-important';

const classes = StyleSheet.create({
  editor: {
    marginBottom: 30,
  },

  row: {
    display: 'flex',
  },

  inputWrapper: {
    flex: 1,

    ':not(:last-child)': {
      marginRight: 20,
    },
  },
});

export default classes;
