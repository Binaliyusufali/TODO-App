/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import AppColors from '../../thema/color';
import {
  ChartCircle,
  Clock,
  CloseCircle,
  TickCircle,
  ArrowCircleRight2,
} from 'iconsax-react-native';

const HeaderComponent = ({ongoing, pending, complated, cancel}) => {
  const tasks = [
    {
      id: 1,
      title: 'Ongoing',
      color: AppColors.ONGOING,
      icon: <ChartCircle size="32" color={AppColors.WHITE} variant="TwoTone" />,
      count: ongoing,
    },
    {
      id: 2,
      title: 'Pending',
      color: AppColors.PENDING,
      icon: <Clock size="32" color={AppColors.WHITE} variant="TwoTone" />,
      count: pending,
    },
    {
      id: 3,
      title: 'Complate',
      color: AppColors.COMPLATED,
      icon: <TickCircle size="32" color={AppColors.WHITE} variant="TwoTone" />,
      count: complated,
    },
    {
      id: 4,
      title: 'Cancel',
      color: AppColors.CANCEL,
      icon: <CloseCircle size="32" color={AppColors.WHITE} variant="TwoTone" />,
      count: cancel,
    },
  ];

  const Task = ({item}) => {
    return (
      <Pressable
        style={{
          width: '45%',
          backgroundColor: item.color,
          padding: 7,
          margin: 10,
          borderRadius: 7,
        }}>
        {item.icon}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <View>
            <Text
              style={{
                color: AppColors.WHITE,
                fontSize: 14,
                fontWeight: '600',
              }}>
              {item.title}
            </Text>
            <Text
              style={{
                color: AppColors.WHITE,
                fontSize: 16,
                fontWeight: '600',
                marginTop: 5,
              }}>
              {item.count} Task
            </Text>
          </View>
          <View>
            <ArrowCircleRight2 size="26" color={AppColors.WHITE} />
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View styles={styles.container}>
      <FlatList
        numColumns={2}
        data={tasks}
        renderItem={({item}) => <Task item={item} />}
      />
      <View>
        <Text style={{fontSize: 18, fontWeight: '600', margin: 10}}>
          All Task
        </Text>
      </View>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
