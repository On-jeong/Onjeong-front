import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

const getItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.log(e);
  }
};

const setStrItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

const getStrItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.log(e);
  }
};

const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};

export const storage = {
  setItem,
  setStrItem,
  getItem,
  getStrItem,
  removeItem,
};
