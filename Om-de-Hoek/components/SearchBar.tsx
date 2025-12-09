import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Search, X } from "lucide-react-native";

type Props = {
    onSearch?: (query: string) => void;
};

export const SearchBar = ({ onSearch }: Props) => {
    const [query, setQuery] = useState("");

    const handleTextChange = (text: string) => {
        setQuery(text);
        if (onSearch) onSearch(text);
    };

    const handleClear = () => {
        setQuery("");
        if (onSearch) onSearch("");
    };

    return (
        <View className="bg-white mx-4 mt-4 rounded-2xl px-4 shadow-xl flex-row items-center">
            <Search color="#828282" size={20} />
            <TextInput
                className="flex-1 text-gray-800 font-comfortaa-medium text-base ml-3"
                placeholder="Zoek een buurt..."
                placeholderTextColor="#828282"
                value={query}
                onChangeText={handleTextChange}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
            />
            {query.length > 0 && (
                <TouchableOpacity onPress={handleClear}>
                    <X color="#828282" size={20} />
                </TouchableOpacity>
            )}
        </View>
    );
};