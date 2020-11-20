import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  loading: {
    marginTop: 25,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  image: {
    marginTop: 20,
    width: 250,
    height: 250,
    borderRadius: 50,
    marginBottom: 20,
  },
  headertext: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontWeight: 'bold',
    fontSize: 24,
  },
  footer: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#00b300',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  text: {
    color: '#ff0000',
    paddingVertical: 15,
    fontSize: 20,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: 2,
  },
  buttons: {
    marginBottom: 40,
  },
  buttonloc: {},
  buttonout: {},
});
