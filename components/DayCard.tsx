import { Pressable, StyleSheet, Text, View } from "react-native";
import { Icons } from "./icon";

const DayCard = ({ Icon, title, isSelected, onSelect, timeRange }) => {
    return(
    <Pressable 
        onPress={onSelect}
        style={({ pressed }) => [
            styles.dayCard,
            isSelected ? styles.dayCardActive : styles.dayCardInactive,
            pressed && styles.pressed
        ]}
    >
        <View style={[
            styles.icon,
        ]}>
            <Icon fill={isSelected ? "#00763E" : "#666"} />
        </View>
       <View style={{
        flexDirection: "row",
        alignItems: "center",
       }}>
        <View style={{flex: 1}}>
            <Text style={[
                styles.cardTitle,
                { color: isSelected ? "#fff" : "#000" }
            ]}>
                {title}
            </Text>
            <Text style={[
                styles.cardDescription,
                { color: isSelected ? "#fff" : "#000" }
            ]}>
                The time range is 
                <Text style={{fontWeight: "bold"}}> {timeRange}</Text>
            </Text>
        </View>
            {
                isSelected ? (<Icons.ActiveRadioIcon />) : (<Icons.InactiveRadioIcon />)
            }
       </View>
    </Pressable>
    );
}

export default DayCard;

const styles = StyleSheet.create({
    dayCard: {
        flexDirection: "column",
        padding: 14,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    dayCardActive: {
        backgroundColor: "#00763E",
    },
    dayCardInactive: {
        backgroundColor: "#f5f5f5",
    },
    icon: {
        height: 40,
        width: 40,
        backgroundColor: "#fff",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 14,
    },
    pressed: {
        opacity: 0.5,
    },
});