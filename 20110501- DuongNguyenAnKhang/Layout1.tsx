import * as React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, View, StyleSheet } from 'react-native';

type RootStackParamList = {
    Layout1: undefined;
    Layout2: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Layout1'>;

interface Layout1Props {
    navigation: NavigationProp;
}
const Layout1: React.FC<Layout1Props> = ({ navigation }) => {

    React.useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Layout2');
        }, 10000); // Change screen after 10 seconds

        return () => clearTimeout(timer); // This will clear the timer when the component unmounts
    }, [navigation]);
    return (
        <View style={styles.container}>
            <Header />
            <Boxes />
        </View>
    );

}

export function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>THÔNG TIN SINH VIÊN</Text>
        </View>
    );
}

const data = [
    { title: 'Đường Nguyễn An Khang', MSSV: '20110501' }
];

export function Boxes() {
    return (
        <View style={styles.container}>
            {data.map((item, index) => (
                <View key={index} style={styles.box}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.MSSV}</Text>
                </View>
            ))}
        </View>
    );
}


export default Layout1;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        width: "100%",
        height: "15%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000', // Change the color to DodgerBlue
        borderBottomWidth: 5, // Add a border at the bottom
        borderBottomColor: '#fefefe', // Make the border white
    },
    headerText: {
        color: '#fff', // Change the text color to white
        fontSize: 24, // Increase the font size
        fontWeight: 'bold', // Make the text bold
    },
    box: {
        backgroundColor: '#000000',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 24,
        color: "#ffffff",
    },
    description: {
        fontSize: 18,
        color: "#ffffff",
    },

});
