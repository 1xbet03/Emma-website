import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from './firebase';
import { handleFirestoreError, OperationType } from './firestoreErrors';
import { Booking } from '../types';

const BOOKINGS_COLLECTION = 'bookings';

/**
 * Subscribes to the authenticated user's real-time bookings from Firestore.
 */
export function subscribeToUserBookings(
  userId: string,
  onBookingsUpdated: (bookings: Booking[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const path = BOOKINGS_COLLECTION;
  const q = query(collection(db, path), where('userId', '==', userId));

  return onSnapshot(
    q,
    (snapshot) => {
      const bookingsList: Booking[] = [];
      snapshot.forEach((docSnap) => {
        bookingsList.push(docSnap.data() as Booking);
      });
      // Sort newest first
      bookingsList.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      onBookingsUpdated(bookingsList);
    },
    (error) => {
      console.error('Snapshot listener error on bookings:', error);
      if (onError) {
        onError(error);
      }
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

/**
 * Persists a new booking to Firestore.
 */
export async function saveBookingToFirestore(
  booking: Booking,
  userId: string
): Promise<void> {
  const docPath = `${BOOKINGS_COLLECTION}/${booking.id}`;
  const payload: Booking = {
    ...booking,
    userId,
  };

  try {
    await setDoc(doc(db, BOOKINGS_COLLECTION, booking.id), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, docPath);
  }
}

/**
 * Cancels a booking in Firestore.
 */
export async function cancelBookingInFirestore(bookingId: string): Promise<void> {
  const docPath = `${BOOKINGS_COLLECTION}/${bookingId}`;
  try {
    await updateDoc(doc(db, BOOKINGS_COLLECTION, bookingId), {
      status: 'cancelled',
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, docPath);
  }
}

/**
 * Deletes a booking document permanently from Firestore.
 */
export async function deleteBookingFromFirestore(bookingId: string): Promise<void> {
  const docPath = `${BOOKINGS_COLLECTION}/${bookingId}`;
  try {
    await deleteDoc(doc(db, BOOKINGS_COLLECTION, bookingId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, docPath);
  }
}
