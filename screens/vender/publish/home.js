import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../../../config/firebase'
import {
  Appbar,
  Button,
  TextInput,
} from 'react-native-paper'
import { AuthContext } from '../../../auth/authContext'
// import { sendNotifcation } from '../../../utils'
import { BOTTOM_TAB_COLORS, VENDOR_SUB_COLLECT, DISPLAY_ALL_ADMINS, ROOT_COLLECT_NAME } from '../../../constants'

const db = firebase.firestore();

export default ({ navigation, route }) => {

  const { userData } = React.useContext(AuthContext)
  const [image, setImage] = useState(null)
  const [imageName, setImageName] = useState(null)
  const [titleForImage, setTitleForImage] = useState("")
  const [descriptionForImage, setDescriptionForImage] = useState("")
  const [price, setPrice] = useState("")

  const [pickImageDone, setPickImageDone] = React.useState(false)

  const [publishBegin, setPublishBegin] = React.useState(false)
  const [publishDone, setPublishDone] = React.useState(false)
  const [publishErr, setPublishErr] = React.useState(false)

  useEffect(() => {
    ImagePicker.requestCameraRollPermissionsAsync().then(({ status }) => {
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }).catch((e) => {
      console.log("Error camera : ", e)
    });
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPickImageDone(true)
      setImage(result.uri);
      let file_name = result.uri.split("/").pop()
      setImageName(file_name.split(".")[0])
    }
  };

  const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri)
    const blob = await response.blob()
    const storageRef = firebase.storage().ref().child("VendorProducts/" + userData.email + "/" + titleForImage)
    return storageRef.put(blob)
  }

  const onClickUpload = () => {
    setPublishBegin(true)
    uploadImage(image, imageName).then(() => {
      console.log("Image inserted successfully with name " + titleForImage)
      const docRef2 = db.collection(ROOT_COLLECT_NAME).doc(userData.email).collection(VENDOR_SUB_COLLECT);
      const display_all_admins = db.collection(ROOT_COLLECT_NAME).doc(DISPLAY_ALL_ADMINS).collection('products')
      const storageRef = firebase.storage().ref().child("VendorProducts/" + userData.email + "/" + titleForImage)
      storageRef.getDownloadURL().then((url) => {
        docRef2.add({
          title: titleForImage,
          description: descriptionForImage,
          price: price,
          url: url,
          email: userData.email,
          phone_no: userData.phone,
          name: userData.name,
        })
          .then(() => {
            display_all_admins.add({
              title: titleForImage,
              description: descriptionForImage,
              price: price,
              url: url,
              email: userData.email,
              phone_no: userData.phone,
              name: userData.name,
            })
            // let locationRef = firebase.firestore().collection('root').doc(data.email)
            // locationRef.collection("admin-vendor-publish").doc(`${data.productName}_${data.email}`).update({
            //   vendorEmail: firebase.firestore.FieldValue.arrayUnion(`${userData.email}`),
            // })
            //   .then(() => console.log("Email inserted successfully"))
            //   .catch(() => console.log("Error while inserting the email"))
            // .then(() => {
            //   if (data.status === true) {
            //     locationRef
            //       .get()
            //       .then(doc__ => {
            //         sendNotification(
            //           doc__.data().token,
            //           `Someone posted ${userData.productName}. Find who posted that!`,
            //           "Want to know their details? Click Here",
            //           '',
            //         )
            //         console.log(doc__.data().token)
            //         console.log("Notification sent successfully")
            //       }).catch(error => console.log("Error occured while sending the notification : ", error))
            //   }
            // }).catch(err => console.log("Error occured while inserting mail : ", err))
            // setStartActivityIndicator(false)
            // Alert.alert("Success", "Uploaded successfully...!")
            // console.log("image field is added and set to true")
            // navigation.navigate("home")
            console.log("Data inserted successfully...!")
          })
          .catch((e) => {
            console.log("Error occured while setting the image field to true", e)
          })
        console.log("Inserted successfully - 1")
      }).then(() => {
        console.log("Pushed successfully")
        setPublishBegin(false)
        setPublishDone(true)
        Alert.alert("Success", "Image published successfully...!",
          [{
            text: "OK",
            onPress: () => {
              setImage(null)
              setImageName(null)
              setTitleForImage("")
              setDescriptionForImage("")
              setPrice("")
              setPickImageDone(false)
              setPublishBegin(false)
              setPublishDone(false)
              setPublishErr(false)
            }
          }])
      }).catch(e => {
        console.log("Error occured : ", e)
      });

    }).catch(error => {
      console.log("Error occured", error)
      Alert.alert("Alert", "Failed to upload Image")
      setPublishErr(true)
    })
  }

  return (
    <>
      <Appbar.Header style={{ backgroundColor: BOTTOM_TAB_COLORS[0] }}>
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
        <Appbar.Content title="Upload Product" />
      </Appbar.Header>
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.textInput}
          label="Product Name"
          placeholder="Enter the product name"
          value={titleForImage}
          onChangeText={text => setTitleForImage(text)}
        />
        <TextInput
          style={styles.textInput}
          label="Description"
          placeholder="Enter the description"
          value={descriptionForImage}
          onChangeText={text => setDescriptionForImage(text)}
          multiline={true}
        />
        <TextInput
          style={styles.textInput}
          label="Price"
          placeholder="Enter the Price"
          value={price}
          onChangeText={text => setPrice(text)}
        />
        <Button
          onPress={pickImage}
          icon='camera-plus-outline'
          mode={pickImageDone ? 'contained' : 'outlined'}
          color={
            pickImageDone ? BOTTOM_TAB_COLORS[4] : BOTTOM_TAB_COLORS[3]
          }
          style={styles.textInput}
        >
          {pickImageDone
            ? 'Selected Image'
            : 'Select Image'}
        </Button>

        <Button
          onPress={onClickUpload}
          icon={
            publishDone
              ? 'cloud-check'
              : publishErr
                ? 'cloud-alert'
                : 'cloud-upload'
          }
          loading={publishBegin}
          mode={publishDone || publishErr ? 'contained' : 'outlined'}
          color={
            publishDone ? BOTTOM_TAB_COLORS[4] : BOTTOM_TAB_COLORS[3]
          }
          style={styles.textInput}
        >
          {publishBegin
            ? 'Uploading...'
            : publishDone
              ? 'Uploaded'
              : publishErr
                ? 'Published Fail, try later'
                : 'Upload'}
        </Button>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20
  },
  textInput: {
    marginVertical: 10,
  }
})