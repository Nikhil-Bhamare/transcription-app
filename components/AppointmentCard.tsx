import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import tw from "twrnc";

const AppointmentCard = () => {
  return (
    <View style={tw`bg-white rounded-xl border border-gray-200 p-4 mb-4`}>
      {/* Header: Avatar + Info + Checkbox */}
      <View style={tw`flex-row items-start justify-between mb-3`}>
        {/* Avatar + Name/Phone */}
        <View style={tw`flex-row items-center`}>
          <View
            style={tw`w-10 h-10 rounded-full bg-blue-600 items-center justify-center mr-3`}
          >
            <Text style={tw`text-white font-semibold`}>UU</Text>
          </View>
          <View>
            <Text style={tw`text-black font-semibold text-base`}>
              Unknown User
            </Text>
            <Text style={tw`text-gray-500 text-sm`}>+91 8899277284</Text>
          </View>
        </View>

        {/* Checkbox (placeholder) */}
        <View style={tw`w-5 h-5 rounded-md border border-gray-300`} />
      </View>

      {/* Status */}
      <View style={tw`mb-3`}>
        <Text style={tw`text-gray-400 mb-1`}>Status</Text>
        <View
          style={tw`bg-green-600 px-3 py-1 rounded-full flex-row items-center self-start`}
        >
          <View style={tw`w-2 h-2 rounded-full bg-white mr-2`} />
          <Text style={tw`text-white text-sm`}>Active</Text>
        </View>
      </View>

      {/* Date & Time */}
      <View style={tw`flex-row justify-between mb-3`}>
        <Text style={tw`text-gray-600 text-sm`}>Date: 15/06/2025</Text>
        <Text style={tw`text-gray-600 text-sm`}>Time: 10:00 AM</Text>
      </View>

      {/* Footer */}
      <View style={tw`border-t border-gray-200 pt-2`}>
        <TouchableOpacity>
          <Text style={tw`text-blue-600 text-sm font-medium`}>
            View Details
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppointmentCard;
