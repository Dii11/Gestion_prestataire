import java.util.Scanner;

public class ProduitMatrice {
    public static int[][] multiply(int[][] matriceA, int[][] matriceB, int numThreads) throws InterruptedException {
        int numRowsA = matriceA.length;
        int numColsA = matriceA[0].length;
        int numRowsB = matriceB.length;
        int numColsB = matriceB[0].length;
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
                            result[row][col] += matriceA[row][k] * matriceB[k][col];
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

        int[][] matriceA = new int[numRowsA][numColsA];
        int[][] matriceB = new int[numRowsB][numColsB];

        System.out.println("Entrez les éléments de la matrice A :");
        for (int i = 0; i < numRowsA; i++) {
            for (int j = 0; j < numColsA; j++) {
                matriceA[i][j] = scanner.nextInt();
            }
        }

        System.out.println("Entrez les éléments de la matrice B :");
        for (int i = 0; i < numRowsB; i++) {
            for (int j = 0; j < numColsB; j++) {
                matriceB[i][j] = scanner.nextInt();
            }
        }

        int[][] result = multiply(matriceA, matriceB, numThreads);

        System.out.println("Résultat de la multiplication des matrices :");
        for (int[] row : result) {
            for (int element : row) {
                System.out.print(element + " ");
            }
            System.out.println();
        }
    }
}
