import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';

const PostWriteScreen = ({ route, navigation }) => {
  // ���� ȭ�鿡�� ���޹��� ������
  const { image, date, weather, keywords, writingStyle } = route.params;
  
  // ���� ����
  const [content, setContent] = useState('');
  const [isAIWriting, setIsAIWriting] = useState(false);

  // AI �ʾ� ����
  const generateAIContent = () => {
    setIsAIWriting(true);
    // TODO: AI API ����
    // �ӽ÷� ���� �ؽ�Ʈ ����
    setTimeout(() => {
      const exampleContent = `�ȳ��ϼ���! ${date.toLocaleDateString()}�� �ٳ�� ���� �̾߱⸦ ����帱�Կ�.
      
${writingStyle} ��Ÿ�Ϸ� �ۼ��غ��Կ�.
${keywords} Ű���带 �߽����� �̾߱⸦ Ǯ����ڽ��ϴ�.
${weather} ���� �ӿ����� ������ ���� Ư���߾��.`;

      setContent(exampleContent);
      setIsAIWriting(false);
    }, 2000);
  };

  // �Խ��ϱ�
  const handleSubmit = () => {
    // TODO: �Խ� ���� ����
    console.log('�Խ� �Ϸ�:', {
      image,
      date,
      weather,
      keywords,
      writingStyle,
      content,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* ���õ� ���� ǥ�� */}
      <View style={styles.infoContainer}>
        <Image source={{ uri: image }} style={styles.thumbnail} />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>��¥: {date.toLocaleDateString()}</Text>
          <Text style={styles.infoText}>����: {weather}</Text>
          <Text style={styles.infoText}>Ű����: {keywords}</Text>
          <Text style={styles.infoText}>�ۼ� ��Ÿ��: {writingStyle}</Text>
        </View>
      </View>

      {/* ���� �ۼ� ���� */}
      <View style={styles.contentContainer}>
        <View style={styles.contentHeader}>
          <Text style={styles.label}>���� �ۼ�</Text>
          <TouchableOpacity
            style={styles.aiButton}
            onPress={generateAIContent}
            disabled={isAIWriting}
          >
            <Text style={styles.aiButtonText}>
              {isAIWriting ? 'AI �ۼ� ��...' : 'AI �ʾ� �ޱ�'}
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.contentInput}
          multiline
          placeholder="���� �̾߱⸦ ����ּ���..."
          value={content}
          onChangeText={setContent}
        />
      </View>

      {/* �Խ� ��ư */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>�Խ��ϱ�</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 4,
  },
  contentContainer: {
    marginBottom: 16,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  aiButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  aiButtonText: {
    color: '#fff',
  },
  contentInput: {
    height: 300,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PostWriteScreen; 