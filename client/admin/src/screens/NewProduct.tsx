import { startTransition, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';

const Categories = [
  { label: 'Games' },
  { label: 'Accessories' },
  { label: 'Consoles' },
  { label: 'Merchandises' },
  { label: 'Alternatives' },
];

const NewProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  const handleChooseImages = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      selectionLimit: 4,
    });

    if (result.assets) {
      result.assets.map((asset) => {
        const imageBase64 = `data:${asset.type};base64,${result.assets[0].base64}`;
        setImages(images.push(imageBase64));
        setImagesPreview(imagesPreview.push(asset.uri));
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoRow}>
        <Text style={[styles.label, { marginBottom: 0 }]}>Category:</Text>
        <TouchableOpacity
          style={styles.button}
          //onPress={submitHandler}
        >
          <Text style={styles.buttonText}>Choose Images</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.inputField}
        value={name}
        onChangeText={(value) => setName(value)}
        placeholder="Example: Anya Figure So Cute"
        placeholderTextColor="#999999"
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={[styles.inputField, { height: 120 }]}
        value={description}
        onChangeText={(value) => setDescription(value)}
        placeholder="Example: This is a super cute figure of Anya Forger. Why Anya is so cute. UwU"
        placeholderTextColor="#999999"
        multiline
      />
      <View style={styles.infoRow}>
        <Text style={[styles.label, { marginBottom: 0 }]}>Price:</Text>
        <TextInput
          style={[styles.inputField, { marginBottom: 0, textAlign: 'center' }]}
          value={price}
          onChangeText={(value) => setPrice(value)}
          placeholder="Ex. 192.99"
          placeholderTextColor="#999999"
          keyboardType="decimal-pad"
        />
        <Text style={[styles.label, { marginBottom: 0 }]}>Stock:</Text>
        <TextInput
          style={[styles.inputField, { marginBottom: 0, textAlign: 'center' }]}
          value={stock}
          onChangeText={(value) => setStock(value)}
          placeholder="Ex. 367"
          placeholderTextColor="#999999"
          keyboardType="number-pad"
        />
      </View>
      <View style={styles.infoRow}>
        <Text style={[styles.label, { marginBottom: 0 }]}>Category:</Text>
        <Dropdown
          style={[styles.inputField, { marginBottom: 0 }]}
          data={Categories}
          value={category}
          onFocus={() => setIsFocus(true)}
          placeholder={!isFocus ? 'Select a category' : '...'}
          onBlur={() => setIsFocus(false)}
          labelField="label"
          valueField="label"
          itemTextStyle={{ color: 'black', fontSize: 16 }}
          selectedTextStyle={{
            color: 'red',
            fontSize: 17,
            fontWeight: '600',
            textAlign: 'center',
          }}
          onChange={(item) => {
            setCategory(item.label);
            setIsFocus(false);
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  inputField: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 10,
    fontSize: 17,
    marginBottom: 20,
    color: 'black',
    fontWeight: '600',
    backgroundColor: 'white',
    flex: 1,
  },
  button: {
    backgroundColor: '#E4000F',
    borderRadius: 5,
    width: 140,
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default NewProduct;
