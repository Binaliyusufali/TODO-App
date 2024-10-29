import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppColors from '../../thema/color';
import {Button, Divider} from '@ui-kitten/components';
import moment from 'moment';
import {setCategory} from '../../utils/function';
import {status, taskValues} from '../../utils/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskDetail = ({route}) => {
  const {item} = route?.params;

  //butonu taskları silmek için
  const deleteTask = async () => {
    try {
      //mevcut görevleri alma
      const savedTasks = await AsyncStorage.getItem('tasks');

      if (savedTasks === null) {
        return; //kayıtlı görev yoksa fonksiyonu durdurur
      }

      const tasks = JSON.parse(savedTasks);

      //silinecek görevi filtreler
      // eslint-disable-next-line space-infix-ops
      const filteredTasks = tasks.filter(task => task.id !== item.id);

      //filtreli görevleri depolar
      await AsyncStorage.setItem('tasks', JSON.stringify(filteredTasks));
      console.log('Görev silindi');
    } catch (error) {
      console.log('Göre silinirken hata oluştu', error);
    }
  };

  //update butonları için
  const updateTask = async newStatus => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');

      if (savedTasks === null) {
        return;
      }

      const tasks = JSON.parse(savedTasks);

      //güncellenecek görev

      const updatedTask = tasks.map(task => {
        if (task.id === item.id) {
          return {
            ...task,
            status: newStatus,
          };
        }
        return task;
      });

      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTask));
      console.log('Görev güncellendi', updateTask);
    } catch (error) {
      console.log('Görev güncellenirken hata oluştu', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Title:</Text>
          <Text>{item.title}</Text>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Description:</Text>
          <Text>{item.description}</Text>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Start Date:</Text>
          <Text>{moment(item.startDate).format('DD/MM/YYYY')}</Text>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>End Date:</Text>
          <Text>{moment(item.endDate).format('DD/MM/YYYY')}</Text>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Category:</Text>
          <Text>{setCategory(item.category)}</Text>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Status:</Text>
          <Text>
            {taskValues.find(task => task.status === item?.status)?.title}
          </Text>
        </View>
        <Divider />
      </ScrollView>

      <View>
        <Button
          onPress={() => updateTask(status.PENDING)}
          style={styles.button}
          status="primary">
          Start
        </Button>
        <Button
          onPress={() => updateTask(status.COMPLATE)}
          style={styles.button}
          status="success">
          Complated
        </Button>
        <Button
          onPress={() => updateTask(status.CANCEL)}
          style={styles.button}
          status="danger">
          Cancel
        </Button>
        <Button onPress={deleteTask} style={styles.button} status="warning">
          Delete
        </Button>
      </View>
    </View>
  );
};

export default TaskDetail;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: AppColors.WHITE, padding: 10},

  button: {
    marginVertical: 5,
  },
});
