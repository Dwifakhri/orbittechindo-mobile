import { View, TextInput, Image } from "react-native";

import { icons } from "@/constants/icons";

interface Props {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
}

const SearchInput = ({ placeholder, value, onChangeText, onPress }: Props) => {
  return (
    <View className="flex-row items-center rounded-full outline-none px-4 py-1 bg-white mt-4 mx-4 border border-gray-200">
      <Image
        source={icons.search}
        className="w-5 h-5"
        resizeMode="contain"
        tintColor="#1481EE"
      />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-3 text-black"
        placeholderTextColor="#A8B5DB"
        onPress={onPress}
      />
    </View>
  );
};

export default SearchInput;
