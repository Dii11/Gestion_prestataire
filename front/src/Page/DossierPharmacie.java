import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MatrixMultiplication {
    private static final int NUM_THREADS = 4; // Nombre de threads à utiliser

    public static int[][] multiply(int[][] matrixA, int[][] matrixB) {
        int numRowsA = matrixA.length;
        int numColsA = matrixA[0].length;
        int numRowsB = matrixB.length;
        int numColsB = matrixB[0].length;

        if (numColsA != numRowsB) {
            throw new IllegalArgumentException("Les dimensions des matrices ne sont pas compatibles pour la multiplication.");
        }

        int[][] result = new int[numRowsA][numColsB];

        ExecutorService executorService = Executors.newFixedThreadPool(NUM_THREADS);

        for (int i = 0; i < numRowsA; i++) {
            for (int j = 0; j < numColsB; j++) {
                final int row = i;
                final int col = j;
                executorService.execute(() -> {
                    int sum = 0;
                    for (int k = 0; k < numColsA; k++) {
                        sum += matrixA[row][k] * matrixB[k][col];
                    }
                    result[row][col] = sum;
                });
            }
        }

        executorService.shutdown();

        while (!executorService.isTerminated()) {
            // Attente de la fin de l'exécution de tous les threads
        }

        return result;
    }

    public static void main(String[] args) {
        int[][] matrixA = {
            {1, 2, 3},
            {4, 5, 6}
        };

        int[][] matrixB = {
            {7, 8},
            {9, 10},
            {11, 12}
        };

        int[][] result = multiply(matrixA, matrixB);

        // Affichage du résultat
        for (int[] row : result) {
            for (int element : row) {
                System.out.print(element + " ");
            }
            System.out.println();
        }
    }
}
