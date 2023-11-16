#include <stdio.h>
#include <stdbool.h>

// Structure for stack
struct Stack {
    int top;
    unsigned capacity;
    char* array;
};

// Function to create a stack of given capacity
struct Stack* createStack(unsigned capacity) {
    struct Stack* stack = (struct Stack*)malloc(sizeof(struct Stack));
    stack->capacity = capacity;
    stack->top = -1;
    stack->array = (char*)malloc(stack->capacity * sizeof(char));
    return stack;
}

// Function to check if the stack is empty
bool isEmpty(struct Stack* stack) {
    return (stack->top == -1);
}

// Function to push an element onto the stack
void push(struct Stack* stack, char item) {
    stack->array[++stack->top] = item;
}

// Function to pop an element from the stack
char pop(struct Stack* stack) {
    if (!isEmpty(stack))
        return stack->array[stack->top--];
    return '$'; // '$' indicates an empty stack
}

// Function to check if brackets in expression are balanced
bool areBracketsBalanced(char* expression) {
    struct Stack* stack = createStack(strlen(expression));
    for (int i = 0; expression[i]; i++) {
        if (expression[i] == '(' || expression[i] == '[' || expression[i] == '{')
            push(stack, expression[i]);
        else if (expression[i] == ')' || expression[i] == ']' || expression[i] == '}') {
            if (isEmpty(stack))
                return false;
            char top = pop(stack);
            if ((expression[i] == ')' && top != '(') ||
                (expression[i] == ']' && top != '[') ||
                (expression[i] == '}' && top != '{'))
                return false;
        }
    }
    return isEmpty(stack);
}

int main() {
    char expression[100];
    printf("Enter an expression: ");
    scanf("%s", expression);

    if (areBracketsBalanced(expression))
        printf("The brackets are balanced.\n");
    else
        printf("The brackets are not balanced.\n");

    return 0;
}
