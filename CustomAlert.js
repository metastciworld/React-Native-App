import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal as RNModal } from 'react-native';
import Modal from 'react-native-modal';

const CustomAlert = ({ isVisible, message, onClose }) => {
  return (
    <Modal isVisible={isVisible}>
      <RNModal>
        <View>
          <Text>{message}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </RNModal>
    </Modal>
  );
};

export default CustomAlert;
