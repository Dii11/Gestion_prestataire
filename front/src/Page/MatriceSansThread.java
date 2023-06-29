import java.util.Scanner;

public class MatrixMultiplicationWithThreads {
    public static int[][] multiply(int[][] matrixA, int[][] matrixB, int numThreads) throws InterruptedException {
        int numRowsA = matrixA.length;
        int numColsA = matrixA[0].length;
        int numRowsB = matrixB.length;
        int numColsB = matrixB[0].length;
        if (numColsA != numRowsB) {
            throw new IllegalArgumentException("Les dimensions des matrices ne sont pas compatibles pour la multiplication.");
        }
        int[][] result = new int[numRowsA][numColsB];

        Thread[] threads = new Thread[numThreads];
        int step = numRowsA / numThreads;

        for (int i = 0; i < numThreads; i++) {
            final int startRow = i * step;
            final int endRow = (i == numThreads - 1) ? numRowsA : (i + 1) * step;

            threads[i] = new Thread(() -> {
                for (int row = startRow; row < endRow; row++) {
                    for (int col = 0; col < numColsB; col++) {
                        for (int k = 0; k < numColsA; k++) {
                            result[row][col] += matrixA[row][k] * matrixB[k][col];
                        }
                    }
                }
            });

            threads[i].start();
        }

        for (Thread thread : threads) {
            thread.join();
        }

        return result;
    }

    public static void main(String[] args) throws InterruptedException {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Entrez le nombre de lignes de la matrice A : ");
        int numRowsA = scanner.nextInt();
        System.out.print("Entrez le nombre de colonnes de la matrice A : ");
        int numColsA = scanner.nextInt();

        System.out.print("Entrez le nombre de lignes de la matrice B : ");
        int numRowsB = scanner.nextInt();
        System.out.print("Entrez le nombre de colonnes de la matrice B : ");
        int numColsB = scanner.nextInt();

        System.out.print("Entrez le nombre de threads à utiliser : ");
        int numThreads = scanner.nextInt();

        int[][] matrixA = new int[numRowsA][numColsA];
        int[][] matrixB = new int[numRowsB][numColsB];

        System.out.println("Entrez les éléments de la matrice A :");
        for (int i = 0; i < numRowsA; i++) {
            for (int j = 0; j < numColsA; j++) {
                matrixA[i][j] = scanner.nextInt();
            }
        }

        System.out.println("Entrez les éléments de la matrice B :");
        for (int i = 0; i < numRowsB; i++) {
            for (int j = 0; j < numColsB; j++) {
                matrixB[i][j] = scanner.nextInt();
            }
        }

        int[][] result = multiply(matrixA, matrixB, numThreads);

        System.out.println("Résultat de la multiplication des matrices :");
        for (int[] row : result) {
            for (int element : row) {
                System.out.print(element + " ");
            }
            System.out.println();
        }
    }
}
