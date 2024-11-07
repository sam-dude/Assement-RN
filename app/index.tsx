import CustomDropdown from "@/components/CustomDropDown";
import CustomTextInput from "@/components/CustomTextInput";
import { StatusBar } from "expo-status-bar";
import Checkbox from 'expo-checkbox';
import { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  Pressable, 
  ScrollView,
  KeyboardAvoidingView, 
  Platform
} from "react-native";
import { Icons } from "@/components/icon";
import DayCard from "@/components/DayCard";
import DatePickerComponent from "@/components/DatePickerComponent";

type ServiceType = 'residential' | 'remote' | null;
type TimeSlot = 'morning' | 'afternoon' | 'evening' | 'night' | null;

type ServiceCardProps = {
  title: string;
  description: string;
  type: ServiceType;
  isSelected: boolean;
  onSelect: () => void;
}

const ServiceCard = ({ title, description, isSelected, onSelect }: ServiceCardProps) => (
  <Pressable 
    onPress={onSelect}
    style={({ pressed }) => [
      styles.serviceCard,
      isSelected ? styles.serviceCardActive : styles.serviceCardInactive,
      pressed && styles.pressed
    ]}
  >
    <View style={{
      marginBottom: 15,
    }}>
      {
        isSelected ? (<Icons.ActiveRadioIcon />) : (<Icons.InactiveRadioIcon />)
      }
    </View>
    <Text style={[
      styles.cardTitle,
      { color: isSelected ? "#fff" : "#000" }
    ]}>
      {title}
    </Text>
    <Text style={[
      styles.cardDescription,
      { color: isSelected ? "#fff" : "#666" }
    ]}>
      {description}
    </Text>
  </Pressable>
);

interface OptionWithCheckboxProps {
  title: string;
  isSelected: boolean;
  onSelect: () => void;
}

const OptionWithCheckbox = ({ title, isSelected, onSelect }: OptionWithCheckboxProps) => (
  <Pressable 
    onPress={onSelect}
    style={({ pressed }) => [
      styles.optionWithCheckBox,
      isSelected ? styles.optionWithCheckBox : styles.optionWithCheckBox,
      pressed && styles.pressed
    ]}
  >
    <Checkbox
      value={isSelected}
      onValueChange={onSelect}
      style={{ marginRight: 10 }}
    />
    <Text style={[
      { color: "#000" }
    ]}>
      {title}
    </Text>
  </Pressable>
);

export default function Index({ navigation }) {
  const [service, setService] = useState<ServiceType>(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [street, setStreet] = useState('');
  const [closestBusStop, setClosestBusStop] = useState('');
  const [landMarks, setLandMarks] = useState('')

  const [onDate, setOnDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [flexible, setFlexible] = useState(false);
  const [isCertainDate, setIsCertainDate] = useState(false);

  // Add a single state variable for selected time
  const [selectedTime, setSelectedTime] = useState<TimeSlot>(null)



  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <StatusBar style="dark" />
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>Location & Date</Text>
        <Text style={styles.subheading}>Select the category that best fits your needs</Text>
        
        <View style={styles.servicesContainer}>
          <ServiceCard
            title="Residential Service"
            description="Select this if you need the task done at a particular location of your choice"
            type="residential"
            isSelected={service === "residential"}
            onSelect={() => setService("residential")}
          />
          <ServiceCard
            title="Remote Service"
            description="Select this if you need the task done remotely"
            type="remote"
            isSelected={service === "remote"}
            onSelect={() => setService("remote")}
          />
        </View>

        {/* residential service more options */}
        {service === "residential" && (
          <View>
            {/* location details */}
            <View style={styles.locationDetails}>
              <Text style={{fontSize: 16}}>Where do you want the task done?</Text>
              <CustomDropdown
                value={selectedValue}
                onChange={setSelectedValue}
                search={true}
                placeholder="Local government"
              />
              {/* street */}
              <CustomTextInput
                placeholder="House address"
                value={street}
                onChangeText={setStreet}
                containerStyle={{ marginBottom: 8 }}
                inputStyle={{ backgroundColor: '#f5f5f5' }}
              />
              {/* closest bus-stop */}
              <CustomTextInput
                placeholder="Closest bus stop"
                value={closestBusStop}
                onChangeText={setClosestBusStop}
                containerStyle={{ marginBottom: 8 }}
                inputStyle={{ backgroundColor: '#f5f5f5' }}
              />
              {/* landmarks */}
              <CustomTextInput
                placeholder="Landmarks"
                value={landMarks}
                onChangeText={setLandMarks}
                containerStyle={{ marginBottom: 8 }}
                inputStyle={{ backgroundColor: '#f5f5f5' }}
              />
            </View>
          </View>
        )}

        {/* time option for both */}
        <View>
          <Text style={{fontSize: 16}}>When do you need this done?</Text>
          <View style={{
            flexDirection: "row",
            gap: 13,
            paddingVertical: 10,
            paddingBottom: 20
          }}>
            <OptionWithCheckbox
              title="On date"
              isSelected={onDate}
              onSelect={() => {
                setOnDate(!onDate)
                setFlexible(false)
              }}
            />
            <OptionWithCheckbox
              title="Flexible"
              isSelected={flexible}
              onSelect={() => {
                setFlexible(!flexible)
                setOnDate(false)
              }}
            />
          </View>
        </View>

       

        {/* certain date */}
        {onDate && (
          <View>
            <DatePickerComponent
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholder="Select a Date"
            />

            {selectedDate && (
              <Pressable
                style={{
                  marginBottom: 20,
                  flexDirection: "row",
                  gap: 8,
                  marginTop: 20
                }}
                onPress={() => setIsCertainDate(!isCertainDate)}
              >
                <Checkbox
                  value={isCertainDate}
                  onValueChange={setIsCertainDate}
                />
                <Text style={{ fontSize: 14 }}>I need a certain time of day</Text>
              </Pressable>
            )}
          </View>
        )}
        {/* flexible */}
        { flexible ? (
          <View
            style={{
              marginBottom: 20,
              flexDirection: "row",
              gap: 8,
            }}
            onTouchEnd={() => setIsCertainDate(!isCertainDate)}
          >
            <Checkbox
              value={isCertainDate}
              onValueChange={setIsCertainDate}
            />
            <Text style={{fontSize: 14}}>I need a certain time of day</Text>
          </View>
        ): null}

        
      {(onDate || flexible) && isCertainDate && (
        <>
          <DayCard
            Icon={(props) => <Icons.MorningIcon {...props} />}
            title="Morning"
            isSelected={selectedTime === 'morning'}
            onSelect={() =>
              setSelectedTime(selectedTime === 'morning' ? null : 'morning')
            }
            timeRange="7:00am to 11:59am"
          />
          <DayCard
            Icon={(props) => <Icons.AfternoonIcon {...props} />}
            title="Afternoon"
            isSelected={selectedTime === 'afternoon'}
            onSelect={() =>
              setSelectedTime(selectedTime === 'afternoon' ? null : 'afternoon')
            }
            timeRange="12:00pm to 4:59pm"
          />
          <DayCard
            Icon={(props) => <Icons.NightIcon {...props} />}
            title="Evening"
            isSelected={selectedTime === 'evening'}
            onSelect={() =>
              setSelectedTime(selectedTime === 'evening' ? null : 'evening')
            }
            timeRange="5:00pm to 9:59pm"
          />
          <DayCard
            Icon={(props) => <Icons.EveningIcon {...props} />}
            title="All Day"
            isSelected={selectedTime === 'night'}
            onSelect={() =>
              setSelectedTime(selectedTime === 'night' ? null : 'night')
            }
            timeRange="7:00am to 9:59pm"
          />
        </>
      )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  subheading: {
    fontSize: 14,
    color: "#0C2039",
    marginBottom: 32,
  },
  servicesContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  serviceCard: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 12,
    flex: 1,
  },
  serviceCardActive: {
    backgroundColor: "#00763E",
  },
  serviceCardInactive: {
    backgroundColor: "#f5f5f5",
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  nextButton: {
    backgroundColor: "#00763E",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 32,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  locationDetails: {
    marginBottom: 20,
  },
  optionWithCheckBox: {
    backgroundColor: "#f5f5f5",
    paddingLeft: 10,
    paddingVertical: 7,
    borderRadius: 4,
    paddingRight: 32,
    flexDirection: "row",
    alignItems: "center",
  }
});