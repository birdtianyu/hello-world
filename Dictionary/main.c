#include <stdio.h>
#include <stdlib.h>

typedef struct CELL {
	int data;
	struct CELL *next;
} CELL;

CELL *CELL_alloc(int data) {
	CELL *p = (CELL *)malloc(sizeof(CELL));
	p->data = data;
	p->next = NULL;
	return p;
}

CELL *insert1(CELL *head, int data) {
	CELL *newnode = CELL_alloc(data);
	CELL *p = head;
	// 在头部插入
	if (p == NULL || p->data > data ) {
		newnode->next = p;
		return newnode;
	}
	else {
		// 寻找插入场所
		while (p->next != NULL && p->next->data < data) {
			p = p->next;
		}
		newnode->next = p->next;
		p->next = newnode;
		return head;
	}
}


void insert2(CELL **head_p, int data) {
	CELL *newone = CELL_alloc(data);
	CELL **p = head_p;
	while ((*p) != NULL && (*p)->data < data) {
		p = &((*p)->next);
	}
	newone->next = *p;
	*p = newone;  // 在最前面插入时，记得更新head指针所指的结点
}

void test(CELL *head) {
	CELL *p = head;
	while (p != NULL) {
		printf("%d\n", p->data);
		p = p->next;
	}
}

int main() {
	CELL *head = NULL;
	insert2(&head, 10);
	insert2(&head, 30);
	insert2(&head, 20);

	head = insert1(head, 60);
	head = insert1(head, 40);
	head = insert1(head, 50);

	test(head);
        
	// 注意什么是空指针
	// int *p = NULL;
	// int **pp = &p;

	// printf("%d\n", &p);
	// printf("%d\n", pp);

	return 0;
}
