import React, { useEffect, useMemo } from "react";
import {
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  Button,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, setSearchQuery, incrementPage } from "../redux/userSlice";
import UserCard from "./UserCard";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, searchQuery, currentPage } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers(1));
  }, [dispatch]);

  const userArray = useMemo(() => Object.values(users), [users]);

  const filteredUsers = useMemo(
    () =>
      userArray.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [userArray, searchQuery]
  );

  const handleLoadMore = () => {
    dispatch(incrementPage());
    dispatch(fetchUsers(currentPage + 1));
  };

  const renderItem = ({ item }) => <UserCard user={item} />;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search users..."
        value={searchQuery}
        onChangeText={(text) => dispatch(setSearchQuery(text))}
      />
      <FlatList
        data={filteredUsers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <Button title="Load More" onPress={handleLoadMore} />
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    height: 40,
    margin: 16,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  footer: {
    padding: 16,
  },
});

export default UserList;
