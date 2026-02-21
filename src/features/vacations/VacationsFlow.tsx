import { useEffect, useState } from 'react';
import { Alert, Text } from 'react-native';

import { VacationsListScreen } from './screens/VacationsScreens';
import { fetchVacationsSnapshot } from './services/vacationsService';
import { VacationsSnapshot } from './types';

interface VacationsFlowProps {
  onOpenProfile: () => void;
  onOpenMessenger: () => void;
}

export function VacationsFlow({ onOpenProfile, onOpenMessenger }: VacationsFlowProps) {
  const [snapshot, setSnapshot] = useState<VacationsSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const response = await fetchVacationsSnapshot();
        setSnapshot(response);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  if (loading) {
    return <Text style={{ marginTop: 60, textAlign: 'center' }}>Loading vacations...</Text>;
  }

  if (!snapshot) {
    return <Text style={{ marginTop: 60, textAlign: 'center' }}>Vacations data is unavailable.</Text>;
  }

  return (
    <VacationsListScreen
      employees={snapshot.employees}
      onOpenAddRequest={() => {
        Alert.alert('Add request', 'Use My Profile vacation request flow in dummy mode.');
      }}
      onOpenMessenger={onOpenMessenger}
      onOpenProfile={onOpenProfile}
      onOpenNotifications={() => {
        Alert.alert('Notifications', 'Notifications are available in profile settings.');
      }}
    />
  );
}
